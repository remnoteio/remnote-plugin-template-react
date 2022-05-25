import {
 usePlugin,
 renderWidget,
 useRunAPIMethodReactive,
} from 'remnote-plugin-sdk';

export const SampleWidget = () => {
  const plugin = usePlugin();
  const name: string | undefined = useRunAPIMethodReactive(
    plugin.settings.getSetting,
    [],
    "name",
  )
  const likesPizza: boolean | undefined = useRunAPIMethodReactive(
    plugin.settings.getSetting,
    [],
    "pizza",
  )
  const favoriteNumber: number | undefined = useRunAPIMethodReactive(
    plugin.settings.getSetting,
    [],
    "favorite-number",
  )

  return (
    <div>
      Sample Plugin
      <div>
        Hi {name}, you {!!likesPizza ? "do" : "don't"} like pizza and your favorite number is {favoriteNumber}!
      </div>
    </div>
  )
}

renderWidget(SampleWidget);
