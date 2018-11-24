import * as ex from "excalibur"

const emitter = new ex.ParticleEmitter(0, -24, 0, 0);
emitter.emitterType = ex.EmitterType.Circle;
emitter.radius = 0;
emitter.minVel = 0;
emitter.maxVel = 100;
emitter.minAngle = 0;
emitter.maxAngle = 6.2;
emitter.isEmitting = true;
emitter.emitRate = 25;
emitter.opacity = 0.83;
emitter.fadeFlag = true;
emitter.particleLife = 100;
emitter.maxSize = 5;
emitter.minSize = 5;
emitter.startSize = 5;
emitter.endSize = 0;
emitter.acceleration = new ex.Vector(0, 0);
emitter.beginColor = ex.Color.fromHex("00EAFF");
emitter.endColor = ex.Color.fromHex("00EAFF");
emitter.isEmitting = true

export default emitter