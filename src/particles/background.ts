import * as ex from "excalibur"

const emitter = new ex.ParticleEmitter(0, 0, 1544, 1553);
emitter.emitterType = ex.EmitterType.Rectangle;
emitter.radius = 1000;
emitter.minVel = 20;
emitter.maxVel = 0;
emitter.minAngle = 0;
emitter.maxAngle = 6.2;
emitter.isEmitting = true;
emitter.emitRate = 40;
emitter.opacity = 0.5;
emitter.fadeFlag = true;
emitter.particleLife = 7000;
emitter.maxSize = 3;
emitter.minSize = 1;
emitter.startSize = 0;
emitter.endSize = 0;
emitter.acceleration = new ex.Vector(7, -215);
emitter.beginColor = ex.Color.White;
emitter.endColor = ex.Color.White;

export default emitter
