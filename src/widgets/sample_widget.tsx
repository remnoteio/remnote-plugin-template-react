import { renderWidget, useTracker } from '@remnote/plugin-sdk';

export const SampleWidget = () => {
  const res = useTracker(async (plugin) => {
    return {
      name: await plugin.settings.getSetting('name'),
      likesPizza: await plugin.settings.getSetting('pizza'),
      favoriteNumber: await plugin.settings.getSetting('favorite-number'),
    };
  });

  return res ? (
    <div>
      Sample Plugin
      <div>
        Hi {res.name}, you {!!res.likesPizza ? 'do' : "don't"} like pizza and your favorite number
        is {res.favoriteNumber}!
      </div>
    </div>
  ) : null;
};

renderWidget(SampleWidget);
