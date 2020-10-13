import React from 'react'

import BugBadge from '../assets/types/bug.svg'
import DarkBadge from '../assets/types/dark.svg'
import DragonBadge from '../assets/types/dragon.svg'
import EletricBadge from '../assets/types/electric.svg'
import FairyBadge from '../assets/types/fairy.svg'
import FightingBadge from '../assets/types/fighting.svg'
import FireBadge from '../assets/types/fire.svg'
import FlyingBadge from '../assets/types/flying.svg'
import GhostBadge from '../assets/types/ghost.svg'
import GrassBadge from '../assets/types/grass.svg'
import GroundBadge from '../assets/types/ground.svg'
import IceBadge from '../assets/types/ice.svg'
import NormalBadge from '../assets/types/normal.svg'
import PoisonBadge from '../assets/types/poison.svg'
import PsychicBadge from '../assets/types/psychic.svg'
import RockBadge from '../assets/types/rock.svg'
import SteelBadge from '../assets/types/steel.svg'
import WaterBadge from '../assets/types/water.svg'

export const handleBadge = key => {
  switch (key) {
    case 'bug': {
      return <BugBadge />
    }
    case 'dark': {
      return <DarkBadge />
    }
    case 'dragon': {
      return <DragonBadge />
    }
    case 'electric': {
      return <EletricBadge />
    }
    case 'fairy': {
      return <FairyBadge />
    }
    case 'fighting': {
      return <FightingBadge />
    }
    case 'fire': {
      return <FireBadge />
    }
    case 'flying': {
      return <FlyingBadge />
    }
    case 'ghost': {
      return <GhostBadge />
    }
    case 'grass': {
      return <GrassBadge />
    }
    case 'ground': {
      return <GroundBadge />
    }
    case 'ice': {
      return <IceBadge />
    }
    case 'normal': {
      return <NormalBadge />
    }
    case 'poison': {
      return <PoisonBadge />
    }
    case 'psychic': {
      return <PsychicBadge />
    }
    case 'rock': {
      return <RockBadge />
    }
    case 'steel': {
      return <SteelBadge />
    }
    case 'water': {
      return <WaterBadge />
    }
    default:
      break
  }
}
