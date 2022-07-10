import { usePlugin, renderWidget, useRunAPIMethodReactive } from '@remnote/plugin-sdk';

export const SampleWidget = () => {
  const plugin = usePlugin();
  const name = useRunAPIMethodReactive(plugin.settings.getSetting, [], 'name') as
    | string
    | undefined;
  const likesPizza = useRunAPIMethodReactive(plugin.settings.getSetting, [], 'pizza') as
    | boolean
    | undefined;
  const favoriteNumber = useRunAPIMethodReactive(
    plugin.settings.getSetting,
    [],
    'favorite-number'
  ) as number | undefined;

  return (
    <div className="p-2 m-2 rounded-lg rn-clr-background-light-positive rn-clr-content-positive">
      <h1 className='text-xl'>Sample Plugin</h1>
      <div>
        Hi {name}, you {!!likesPizza ? 'do' : "don't"} like pizza and your favorite number is{' '}
        {favoriteNumber}!
      </div>
    </div>
  );
};

renderWidget(SampleWidget);
