import { BaseSchemes, Scope } from 'rete'
import { BaseArea, BaseAreaPlugin, RenderSignal } from 'rete-area-plugin'
import { renderContextMenu } from './asmblr-context-render'
import { Item, Items, Position } from './types'

export * as Presets from './presets'

export type Props<Schemes extends BaseSchemes> = {
  delay?: number
  items: Items<Schemes>
}

export type ContextMenuExtra =
  | RenderSignal<'contextmenu', {
      items: Item[]
      onHide(): void
      searchBar?: boolean
    }>

type Requires<Schemes extends BaseSchemes> =
  | { type: 'contextmenu', data: { event: MouseEvent, context: 'root' | Schemes['Node'] | Schemes['Connection'] } }
  | { type: 'unmount', data: { element: HTMLElement } }
  | { type: 'pointerdown', data: { position: Position, event: PointerEvent } }

export class ContextMenuPlugin<Schemes extends BaseSchemes> extends Scope<never, [Requires<Schemes> | ContextMenuExtra]> {
  private element: HTMLElement | null = null

  constructor(private props: Props<Schemes>) {
    super('context-menu')
  }

  setParent(scope: Scope<Requires<Schemes>>): void {
    super.setParent(scope)

    const area = this.parentScope<BaseAreaPlugin<Schemes, BaseArea<Schemes>>>(BaseAreaPlugin)
    const container: HTMLElement = (area as any).container
    if (!container || !(container instanceof HTMLElement)) throw new Error('container expected')

    // Reuse single div
    const element = document.createElement('div')
    element.style.position = 'fixed'
    element.style.display = 'none'
    container.appendChild(element)
    this.element = element

    this.addPipe(context => {
      const parent = this.parentScope()
      if (!context || typeof context !== 'object' || !('type' in context)) return context

      if (context.type === 'unmount') {
        if (context.data.element === element) {
          element.style.display = 'none'
        }
      }

      else if (context.type === 'contextmenu') {
        const { event, context: ctx } = context.data
        event.preventDefault()
        event.stopPropagation()

        const { searchBar, list } = this.props.items(ctx, this)

        element.style.left = `${event.clientX}px`
        element.style.top = `${event.clientY}px`
        element.style.display = ''

        const onHide = () => {
          element.style.display = 'none'
          void parent.emit({ type: 'unmount', data: { element } })
        }

        renderContextMenu(element, {
          items: list,
          searchBar,
          onHide,
          onUnmount: () => {
            void parent.emit({ type: 'unmount', data: { element } })
          }
        })
      }

      else if (context.type === 'pointerdown') {
        if (!context.data.event.composedPath().includes(this.element!)) {
          this.element!.style.display = 'none'
          void this.parentScope().emit({ type: 'unmount', data: { element: this.element! } })
        }
      }

      return context
    })
  }
}