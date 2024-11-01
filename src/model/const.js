const defaultListState = [
    {
        id: '0',
        key: '',
        value: '',
    }
]

const generatorListTest = [
    {
      id: '1',
      key: 'bla1',
      value: 'blablabla1',
    },
    {
      id: '2',
      key: 'bla2',
      value: [
        {
          id: '15',
          key: 'bla15',
          value: 'blablabla15',
        },
      ],
    },
    {
      id: '3',
      key: 'bla3',
      value: [
        {
          id: '47',
          key: 'bla47',
          value: 'blablabla47',
        },
      ],
    },
    {
      id: '50',
      key: 'bla50',
      value: 'blablabla50',
    },
  ];

export { defaultListState, generatorListTest }