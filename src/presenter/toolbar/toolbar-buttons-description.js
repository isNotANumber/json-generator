const TOOLBAR_DESCRIPTION = {
    left: {
        selector: '.toolbar__left',
        buttons: {
            applyButton: {
            modifiers: ['button--green'],
            buttonText: 'Apply'
        },
        clearButton: {
            modifiers: ['button--red'],
            buttonText: 'Clear'
        },
        }
    },
    right: {
        selector: '.toolbar__right',
        buttons: {
            copyButton: {
                modifiers: [],
                buttonText: 'Copy'
            },
            saveButton: {
                modifiers: [],
                buttonText: 'Save'
            },
        }
    },
};

export { TOOLBAR_DESCRIPTION }