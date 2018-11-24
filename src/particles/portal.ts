import * as ex from 'excalibur';

const emitter = new ex.ParticleEmitter(0, 0, 2, 2);
emitter.emitterType = ex.EmitterType.Rectangle;
emitter.radius = 5;
emitter.minVel = 20;
emitter.maxVel = 0;
emitter.minAngle = 0;
emitter.maxAngle = 6.2;
emitter.isEmitting = false;
emitter.emitRate = 30;
emitter.opacity = 0.5;
emitter.fadeFlag = true;
emitter.particleLife = 2000;
emitter.maxSize = 25;
emitter.minSize = 1;
emitter.startSize = 0;
emitter.endSize = 0;
emitter.acceleration = new ex.Vector(0, 0);
emitter.beginColor = ex.Color.Cyan;
emitter.endColor = ex.Color.Magenta;
emitter.isEmitting = true

export default emitter
