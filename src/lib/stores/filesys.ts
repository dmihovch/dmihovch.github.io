import {writable, type Writable} from 'svelte/store';

export type FSNodeType = 'file' | 'dir' | 'exec' | 'webpage';

export type FSNode = {
  name: string;
  alias: string;
  type: FSNodeType
  children: FSNode[];
};


const rootfs_builder: FSNode = {
  name:'/',
  alias: '',
  type: 'dir',
  children:[
    {
      name:'home',
      alias: '',
      type: 'dir',
      children: [
        {
          name: 'dan',
          alias: '~',
          type: 'dir',
          children: [
            {
              name: 'projects',
              alias: '',
              type: 'dir',
              children: []
            },
            {
              name: 'resume',
              alias: '',
              type: 'dir',
              children: []
            },
            {
              name: 'blog',
              alias: '',
              type: 'dir',
              children: []
            },
            {
              name: 'reading-list',
              alias: '',
              type: 'dir',
              children: []
            },
          ]
        }
      ]
    },
  ]
}

export const rootfs: Writable<FSNode>= writable<FSNode>(rootfs_builder);

rootfs.subscribe(value => {
  localStorage.setItem('rootfs', JSON.stringify(value));
})

