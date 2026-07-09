// Optional texture loader hook for island ground meshes.
// If a texture file exists for an island, loads and returns it.
// Falls back to null so the procedural material stays in place.

import { useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'
import { useState, useEffect } from 'react'

// Texture paths map — add entries here when you drop image files into src/assets/textures/
// Format: { islandId: '/path/to/texture.jpg' }
const TEXTURE_MAP = {
  // childhood: '/textures/childhood_ground.jpg',
  // fear: '/textures/fear_ground.jpg',
  // future: '/textures/future_ground.jpg',
  // love: '/textures/love_ground.jpg',
  // technology: '/textures/technology_ground.jpg',
  // death: '/textures/death_ground.jpg',
  // space: '/textures/space_ground.jpg',
}

export function useIslandTexture(islandId) {
  const texturePath = TEXTURE_MAP[islandId]

  if (!texturePath) return null

  try {
    const texture = useLoader(TextureLoader, texturePath)
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(2, 2)
    return texture
  } catch {
    return null
  }
}
