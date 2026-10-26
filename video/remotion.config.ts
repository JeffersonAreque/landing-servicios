import { Config } from '@remotion/cli/config'

// Calidad antes que velocidad: cada fotograma en PNG (sin pérdida) y H.264 muy fino.
Config.setVideoImageFormat('png')
Config.setCodec('h264')
Config.setPixelFormat('yuv420p')
Config.setCrf(16)
Config.setX264Preset('veryslow')
// Sin audio: la música se pone en TikTok.
Config.setMuted(true)
