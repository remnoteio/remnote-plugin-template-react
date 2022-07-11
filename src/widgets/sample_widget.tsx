import { usePlugin, renderWidget, useReactiveAPI } from '@remnote/plugin-sdk';

export const SampleWidget = () => {
  const plugin = usePlugin();

  let name = useReactiveAPI(() => plugin.settings.getSetting<string>('name'));
  let likesPizza = useReactiveAPI(() => plugin.settings.getSetting<boolean>('pizza'));
  let favoriteNumber = useReactiveAPI(() => plugin.settings.getSetting<number>('favorite-number'));

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
