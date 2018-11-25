import * as ex from "excalibur"

const emitter = new ex.ParticleEmitter(0, 0, 2, 2);
emitter.emitterType = ex.EmitterType.Circle;
emitter.radius = 5;
emitter.minVel = 600;
emitter.maxVel = 800;
emitter.minAngle = 0;
emitter.maxAngle = 6.2;
emitter.isEmitting = false;
emitter.emitRate = 463;
emitter.opacity = 0.95;
emitter.fadeFlag = false;
emitter.particleLife = 556;
emitter.maxSize = 10;
emitter.minSize = 1;
emitter.startSize = 18;
emitter.endSize = 2;
emitter.acceleration = new ex.Vector(0, -33);
emitter.beginColor = ex.Color.Cyan;
emitter.endColor = ex.Color.Magenta;

export default emitter
