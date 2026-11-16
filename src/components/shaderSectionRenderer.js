// Raw WebGL renderer for the shader section background (no dependencies).
//
// The picture is a blurred "light through blinds" field fitted to
// design/components-design/shader-section.png (luminance RMSE ≈ 4/255):
//   t = base ramp (dark top → light bottom-right) × soft shadow bands + one bright streak,
//   colour = mix(#101011, #f1b928, t).
// Every animated term is a function of phase = 2π·time/period only (integer harmonics of
// sin/cos, and noise sampled along a circle), so frame(t) === frame(t + period): no loop seam.

export const SHADER_PERIOD = 24 // seconds per loop

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution; // drawing buffer size, device px
uniform float uTime;      // seconds within the loop
uniform float uPeriod;    // loop length, seconds

const float TAU = 6.28318530718;
const vec3 DARK = vec3(16.0, 16.0, 17.0) / 255.0; // #101011
const vec3 GOLD = vec3(241.0, 185.0, 40.0) / 255.0; // #f1b928
// Design frame aspect (1317 × 572 px in the screenshot) — composition is anchored to the centre.
const float HALF_ASPECT = 1.1512;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float band(float q, float centre, float width) {
  float d = (q - centre) / width;
  return exp(-d * d);
}

void main() {
  float phase = TAU * uTime / uPeriod;
  vec2 loop = vec2(cos(phase), sin(phase));

  // Section coordinates in units of section height, y pointing down (matches the fit).
  float X = (gl_FragCoord.x - 0.5 * uResolution.x) / uResolution.y + HALF_ASPECT;
  float Y = 1.0 - gl_FragCoord.y / uResolution.y;

  // Band direction runs from upper-left to lower-right; it sways slightly around a pivot in the
  // middle of the composition (so the far edges don't swing more than the centre).
  const float ANG0 = 0.6945;
  const vec2 PIVOT = vec2(1.15, 0.75);
  vec2 dir0 = vec2(cos(ANG0), sin(ANG0));
  float ang = ANG0 + 0.03 * sin(phase + 0.8);
  vec2 dir = vec2(cos(ang), sin(ang));
  vec2 rel = vec2(X, Y) - PIVOT;
  float q = dot(rel, vec2(-dir.y, dir.x)) + dot(PIVOT, vec2(-dir0.y, dir0.x)); // across the bands
  float a = dot(rel, dir) + dot(PIVOT, dir0);                                   // along the bands

  // Wave-like undulation: travelling waves along the bands + noise sampled on a circle.
  q += 0.018 * sin(a * 3.1 - phase + 0.4)
     + 0.010 * sin(a * 5.3 + 2.0 * phase + 1.7)
     + 0.040 * (noise(vec2(X, Y) * 1.4 + 0.55 * loop) - 0.5);

  float base = 0.6927 * smoothstep(
    0.4867 + 0.02 * sin(phase + 3.0),
    1.3753 + 0.02 * sin(phase + 3.0),
    Y + 0.242 * X
  );

  float shade =
    (1.0 - 0.8104 * band(q, -0.5221 + 0.038 * sin(phase) + 0.015 * sin(2.0 * phase + 1.3),
                         0.0720 * (1.0 + 0.16 * sin(2.0 * phase + 0.5)))) *
    (1.0 - 0.6749 * band(q, -1.1662 + 0.045 * sin(phase + 2.1), 0.3415)) *
    (1.0 - 0.1658 * band(q, 0.2545 + 0.050 * sin(phase + 5.0), 0.3557));

  float streak = 0.6239 * (1.0 + 0.12 * sin(phase + 1.0))
    * band(q, 0.3836 + 0.040 * sin(phase + 4.0) + 0.012 * sin(2.0 * phase), 0.0575 * (1.0 + 0.12 * sin(phase + 2.6)))
    * smoothstep(0.4775, 1.1835, a);

  float t = clamp(base * shade + streak, 0.0, 1.0);
  vec3 colour = mix(DARK, GOLD, t);

  // Static dither (independent of time) to avoid banding in the dark gradient.
  colour += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  gl_FragColor = vec4(colour, 1.0);
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) && !gl.isContextLost()) {
    console.error('ShaderSection: shader compile error', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

// Returns null when WebGL is unavailable or the program fails to build (caller shows the CSS fallback).
export function createShaderRenderer(canvas) {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power',
  })
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ShaderSection: program link error', gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }
  gl.useProgram(program)

  // One full-screen triangle.
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const uResolution = gl.getUniformLocation(program, 'uResolution')
  const uTime = gl.getUniformLocation(program, 'uTime')
  const uPeriod = gl.getUniformLocation(program, 'uPeriod')
  gl.uniform1f(uPeriod, SHADER_PERIOD)

  return {
    gl,
    resize(cssWidth, cssHeight) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.round(cssWidth * dpr))
      const height = Math.max(1, Math.round(cssHeight * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, width, height)
      gl.uniform2f(uResolution, width, height)
    },
    // loopTime: seconds; wrapped into [0, period) here so precision never degrades over long sessions.
    render(loopTime) {
      if (gl.isContextLost()) return
      gl.uniform1f(uTime, ((loopTime % SHADER_PERIOD) + SHADER_PERIOD) % SHADER_PERIOD)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    destroy() {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
