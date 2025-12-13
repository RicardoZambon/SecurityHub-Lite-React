import "react-router-dom"
import type { UIMatch } from 'react-router-dom'

declare module "react-router-dom" {
  interface CustomRouteObject extends UIMatch<unknown, unknown> {
    handle?: {
      icon?: any,
      title?: string,
    }
  }
}
