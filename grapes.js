let editor;
function grapesjsInit() {
  editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#container',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    // height: '300px',
    width: 'auto',
    allowScripts: 1,
    allowUnsafeAttr: 1,
    // Avoid any default panel
    panels: { defaults: [] },
    // canvas: {
    //   styles: [
    //     '/edit.css'
    //   ]
    // },

    // storageManager: false,
    storageManager: {
      type: 'remote',
      // stepsBeforeSave: 1,
      autosave: false,
      // autoload: true,
      params: {},
      options: {
        remote: {
            headers: {
              'Content-Type': 'application/json',
          },
          urlStore: 'http://localhost/save.php',
          // urlLoad: 'load.php',
          contentTypeJson: true,
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
          onStore: (data, editor) => {
            const dom = {
              'page': `${window.location.pathname.slice(1,).split('-')[0]}`,
              'html': editor.getHtml()
            };
            fetch('/save.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(dom)})
              .then((response) => response.json())
              .then((response) => {
                  console.log(response)
              });
          },
        },
      },
    },

    i18n: {
      messages: { ru },
      locale: 'ru', // default locale
      // detectLocale: true, // by default, the editor will detect the language
      localeFallback: 'en', // default fallback
    },

    layerManager: {
      appendTo: '.layers-container'
    },
    // We define a default panel as a sidebar to contain layers
    panels: {
      defaults: [{
        id: 'layers',
        el: '.panel__right',
        // Make the panel resizable
        resizable: {
          maxDim: 350,
          minDim: 200,
          tc: 0, // Top handler
          cl: 1, // Left handler
          cr: 0, // Right handler
          bc: 0, // Bottom handler
          // Being a flex child we need to change `flex-basis` property
          // instead of the `width` (default)
          keyWidth: 'flex-basis',
        },
      },
      {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [{
            id: 'show-layers',
            active: true,
            label: 'Элементы',
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
            togglable: false,
          }, {
            id: 'show-style',
            active: true,
            label: 'Стили',
            command: 'show-styles',
            togglable: false,
        }],
      }
    ]
  },

  // The Selector Manager allows to assign classes and
  // different states (eg. :hover) on components.
  // Generally, it's used in conjunction with Style Manager
  // but it's not mandatory
  selectorManager: {
    appendTo: '.styles-container'
  },
  
  styleManager: {
    appendTo: '.styles-container',
    sectors: [{
        name: 'Размеры',
        open: false,
        // Use built-in properties
        buildProps: ['width', 'min-height', 'padding'],
        // Use `properties` to define/override single property
        properties: [
          {
            // Type of the input,
            // options: integer | radio | select | color | slider | file | composite | stack
            type: 'integer',
            name: 'Ширина', // Label for the property
            property: 'width', // CSS property (if buildProps contains it will be extended)
            units: ['px', '%'], // Units, available only for 'integer' types
            defaults: 'auto', // Default value
            min: 0, // Min value, available only for 'integer' types
          }
        ]
      },{
        name: 'Дополнительно',
        open: false,
        buildProps: ['background-color', 'box-shadow'],
        // buildProps: ['background-color', 'box-shadow', 'custom-prop'],
        properties: [
        //   {
        //     id: 'custom-prop',
        //     name: 'Custom Label',
        //     property: 'font-size',
        //     type: 'select',
        //     defaults: '32px',
        //     // List of options, available only for 'select' and 'radio'  types
        //     options: [
        //       { value: '12px', name: 'Tiny' },
        //       { value: '18px', name: 'Medium' },
        //       { value: '32px', name: 'Big' },
        //     ],
        //  }
        ]
      }]
  },
    
  // blockManager: {
  //     appendTo: '#blocks',
  //     blocks: [
        
  //     ]
  //   },
  });

  editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
  });

  editor.Panels.addPanel({
  id: 'basic-actions',
  el: '.panel__basic-actions',
  buttons: [
      {
        id: 'visibility',
        active: true, // active by default
        className: 'btn-toggle-borders',
        label: '<u>Вкл/выкл границы</u>',
        command: 'sw-visibility', // Built-in command
      }, 
      {
        id: 'undo',
        className: 'btn-undo',
        label: '<img id="undo" src="/media/grapesjs/undo.svg">',
        command: 'undo',
      }, 
      {
        id: 'redo',
        className: 'btn-redo',
        label: '<img id="redo" src="/media/grapesjs/undo.svg">',
        command: 'redo',
      }, 
      {
        id: 'save',
        className: 'btn-save',
        label: '<img id="save" src="/media/grapesjs/save.svg">',
        command: 'save-data',
      }, 
      // {
      // id: 'export',
      // className: 'btn-open-export',
      // label: 'Exp',
      // command: 'export-template',
      // context: 'export-template', // For grouping context of buttons from the same panel
      // }, 
      // {
      // id: 'show-json',
      // className: 'btn-show-json',
      // label: 'JSON',
      // context: 'show-json',
      // command(editor) {
      //     editor.Modal.setTitle('Components JSON')
      //     .setContent(`<textarea style="width:100%; height: 250px;">
      //         ${JSON.stringify(editor.getComponents())}
      //     </textarea>`)
      //     .open();
      // },
      // }
    ],
  });

  editor.Commands.add('show-layers', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getLayersEl(row) { return row.querySelector('.layers-container') },
  
    run(editor, sender) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = '';
    },
    stop(editor, sender) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = 'none';
    },
  });

  editor.Commands.add('show-styles', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getStyleEl(row) { return row.querySelector('.styles-container') },
  
    run(editor, sender) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = '';
    },
    stop(editor, sender) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = 'none';
    },
  });

  const um = editor.UndoManager;
  // undoBtn = document.getElementById('undo');
  // redoBtn = document.getElementById('redo');

  editor.on('update', () => {
    if (um.hasUndo()) {
      document.getElementById('undo').style.opacity = 1;
    }
    else {
      document.getElementById('undo').style.opacity = 0.5;
    }

    if (um.hasRedo()) {
      document.getElementById('redo').style.opacity = 1;
    }
    else {
      document.getElementById('redo').style.opacity = 0.5;
    }
  })

  editor.Commands.add('undo', {
    run(editor, sender) {
      um.undo();
      setTimeout(() => {
        if (um.hasUndo()) {
          document.getElementById('undo').style.opacity = 1;
        }
        else {
          document.getElementById('undo').style.opacity = 0.5;
        }
    
        if (um.hasRedo()) {
          document.getElementById('redo').style.opacity = 1;
        }
        else {
          document.getElementById('redo').style.opacity = 0.5;
        }
      }, 50);
    }
  });
  editor.Commands.add('redo', {
    run(editor, sender) {
      um.redo();
      setTimeout(() => {
        if (um.hasUndo()) {
          document.getElementById('undo').style.opacity = 1;
        }
        else {
          document.getElementById('undo').style.opacity = 0.5;
        }
    
        if (um.hasRedo()) {
          document.getElementById('redo').style.opacity = 1;
        }
        else {
          document.getElementById('redo').style.opacity = 0.5;
        }
      }, 50);
    }
  });
  editor.I18n.setLocale('ru');

  editor.Commands.add('save-data', {
    run(editor, sender) {
      const dom = {
        'page': `${window.location.pathname.slice(1,).split('-')[0]}`,
        'html': editor.getHtml()
      };
      fetch('/save.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dom)})
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
        });
    }
  });
}

const gjs = document.getElementById('container');
const content = document.createElement('html');
const page = window.location.pathname.split('-')[0];
// fetch(`${page}.html`)
//   .then(response => response.text())
//   .then((text) => { 
//     content.innerHTML = text;
//     return content;
//   })
//   .then((content) => {
//     // console.log(content.querySelector('.all-root-barba').outerHTML); 
//     // gjs.innerHTML =content.querySelector('.all-root-barba').outerHTML;
//     console.log(content.querySelector('body')); 
//     gjs.innerHTML = content.querySelector('body').innerHTML;
// });

// fetch('/index.js')
// .then(response => response.text())
// .then((text) => { 
//   let script = document.createElement('script');
//   script.innerHTML = text;
//   console.log(script);
//   gjs.appendChild(script);
//   return script;
// })
// .then(text => setTimeout(() => {console.log(tweens); tweens.forEach(t => {t.reverse(0); t.kill()})}, 1000))
// // .then(text => setTimeout(() => {for (let tween of tweens) {console.log(tween); tween.reverse(0); tween.kill()}}, 1000))
// .then(text => setTimeout(() => grapesjsInit(), 1000));

setTimeout(() => {tweens.forEach(t => {t.reverse(0); t.kill()})}, 600);
setTimeout(() => grapesjsInit(), 1200);

const ru = {
  "assetManager": {
    "addButton": "Добавить изображение",
    "inputPlh": "http:",
    "modalTitle": "Выбрать изображение",
    "uploadTitle": "Перетащите файлы сюда или кликните, чтобы загрузить"
  },
  
  "blockManager": {
    "labels": {
      
    },
    "categories": {
      
    }
  },
  "domComponents": {
    "names": {
      "": "Box",
      "wrapper": "Body",
      "text": "Text",
      "comment": "Comment",
      "image": "Image",
      "video": "Video",
      "label": "Label",
      "link": "Link",
      "map": "Map",
      "tfoot": "Table foot",
      "tbody": "Table body",
      "thead": "Table head",
      "table": "Table",
      "row": "Table row",
      "cell": "Table cell"
    }
  },
  "deviceManager": {
    "device": "Device",
    "devices": {
      "desktop": "Desktop",
      "tablet": "Tablet",
      "mobileLandscape": "Mobile Landscape",
      "mobilePortrait": "Mobile Portrait"
    }
  },
  "panels": {
    "buttons": {
      "titles": {
        "preview": "Предпросмотр",
        "fullscreen": "Полный экран",
        "sw-visibility": "Открыть компоненты",
        "export-template": "Открыть код",
        "open-sm": "Открыть менеджер стилей",
        "open-tm": "Настройки",
        "open-layers": "Открыть менеджер слоев",
        "open-blocks": "Открыть блоки"
      }
    }
  },
  "selectorManager": {
    "label": "Классы",
    "selected": "Selected",
    "emptyState": "- Состояние -",
    "states": {
      "hover": "Hover",
      "active": "Click",
      "nth-of-type(2n)": "Even/Odd"
    }
  },
  "styleManager": {
    "empty": "Select an element before using Style Manager",
    "layer": "Layer",
    "fileButton": "Images",
    "sectors": {
      "general": "General",
      "layout": "Layout",
      "typography": "Typography",
      "decorations": "Decorations",
      "extra": "Дополнительное",
      "flex": "Flex",
      "dimension": "Размеры"
    },
    
    
    "properties": {
      "text-shadow-h": "X",
      "text-shadow-v": "Y",
      "text-shadow-blur": "Blur",
      "text-shadow-color": "Color",
      "box-shadow-h": "X",
      "box-shadow-v": "Y",
      "box-shadow-blur": "Blur",
      "box-shadow-spread": "Spread",
      "box-shadow-color": "Color",
      "box-shadow-type": "Type",
      "margin-top-sub": "Top",
      "margin-right-sub": "Right",
      "margin-bottom-sub": "Bottom",
      "margin-left-sub": "Left",
      "padding-top-sub": "Top",
      "padding-right-sub": "Right",
      "padding-bottom-sub": "Bottom",
      "padding-left-sub": "Left",
      "border-width-sub": "Ширина",
      "border-style-sub": "Style",
      "border-color-sub": "Color",
      "border-top-left-radius-sub": "Top Left",
      "border-top-right-radius-sub": "Top Right",
      "border-bottom-right-radius-sub": "Bottom Right",
      "border-bottom-left-radius-sub": "Bottom Left",
      "transform-rotate-x": "Rotate X",
      "transform-rotate-y": "Rotate Y",
      "transform-rotate-z": "Rotate Z",
      "transform-scale-x": "Scale X",
      "transform-scale-y": "Scale Y",
      "transform-scale-z": "Scale Z",
      "transition-property-sub": "Property",
      "transition-duration-sub": "Duration",
      "transition-timing-function-sub": "Timing",
      "background-image-sub": "Image",
      "background-repeat-sub": "Repeat",
      "background-position-sub": "Position",
      "background-attachment-sub": "Attachment",
      "background-size-sub": "Size"
    }   
    
  },
  "traitManager": {
    "empty": "Select an element before using Trait Manager",
    "label": "Component settings",
    "traits": {
      "options": {
        "target": {
          "false": "This window",
          "_blank": "New window"
        }
      }
    }
  },
  "storageManager": {
    "recover": "Do you want to recover unsaved changes?"
  }
}
