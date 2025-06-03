import {
  declareIndexPlugin,
  PropertyType,
  ReactRNPlugin,
  WidgetLocation,
} from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function updateIcons(plugin: ReactRNPlugin) {
  const allRems = await plugin.rem.getAll();
const rems = [];

for (const rem of allRems) {
  if (await rem.hasPowerup('icon')) {
    rems.push(rem);
  }
}

  for (const rem of rems) {
    const imageURL = await rem.getPowerupProperty('icon', 'image');
    if (!imageURL) continue;

    const sizeValue = await rem.getPowerupProperty('icon', 'size');
    const finalSize = sizeValue ? `${sizeValue}px` : '16px';

    const selector = `[data-rem-id="${rem._id}"] .rem-text`;
    const remElement = document.querySelector(selector);

    if (remElement) {
      remElement.classList.add('rem-with-icon');

      // Remove old icon if any (to update dynamically)
      const existingIcon = remElement.querySelector('.icon-image');
      if (existingIcon) existingIcon.remove();

      const img = document.createElement('img');
      img.src = imageURL;
      img.className = 'icon-image';
      img.alt = 'icon';
      img.style.width = finalSize;
      img.style.height = finalSize;
      img.style.objectFit = 'contain';
      img.style.backgroundRepeat = 'no-repeat';
      img.style.marginRight = '4px';
      img.style.verticalAlign = 'middle';

      remElement.prepend(img);
    }
  }
}

async function onActivate(plugin: ReactRNPlugin) {
  // Register the "Icon" powerup
  await plugin.app.registerPowerup({
  name: "Icon",
  code: "icon",
  description: "Assign a custom icon to a Rem with optional size",
  options: {
    properties: [
      {
        code: "image",
        name: "Image",
        propertyType: PropertyType.IMAGE
      },
      {
        code: "size",
        name: "Size (px)",
        propertyType: PropertyType.NUMBER
      }
    ]
  }
});

  // Register supporting CSS
  await plugin.app.registerCSS("icon-style", `
    .rem-with-icon {
      display: inline-flex;
      align-items: center;
    }
    .rem-with-icon .icon-image {
      margin-right: 4px;
      vertical-align: middle;
      object-fit: contain;
      background-repeat: no-repeat;
    }
  `);

  // Observe DOM changes and apply icon logic
  const observer = new MutationObserver(() => {
    updateIcons(plugin);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial icon update on activation
  updateIcons(plugin);
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate); 