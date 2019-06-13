const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');
// const MathUtil = require('../../util/math-util');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
// 这是一支笔
// const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==';
// 微信聊天框
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAADFElEQVRYR73Yb+ieYxQH8M/IUiOF/JsmSpH8iWFr8obS1sYLtIbShEjaSkqivFneaFvyt4S8EJMXozaZ0mpb/pcytVImjIW2NPJ39F3Xo9v9e+7nuZ/r92tXPfXcz32+53yvc51zrnOeWfqtk3EVrsG5OAmn4G/8UD6f4R28XZ77aW5JzRqDuhAP4XqMkx2o+gfv4jm8jj8mYdZl5Hg8gxsnUTZE9muswPa+eoYRWooXcGJfJWPk4rG1uB/5PnK1Cd1WXN33eMbpb75/BbeUuOvENQ2vxPOTWKiQfQL3jsINCJ2DTzG7wsgkkBzZZfioCzQg9AEunUTzNGQ/xvxRhPLyw2kYqIHGZohNWfFQzvWeGq3TwDzVZTOE3sPl01BeA30fC7o89F25BmoU12K+x6kFfHW5cg49xkM/49hazZW4XzGnYFOf9uHuAaGk4CWVimthu5BSk7UDC3EzXo6HXsSttZorcZuxpGC/wVz8hLNCaBneqFRcC7sLz5bY3dPoJFaG0BH49jAG9u84Ab/gQaxp7GrzoFLnfnm8drsT4kLi0eKV3ZjXwO9uXq6HI5ZS8xbhIFZjXWszvzUJHVk6vOsm3HFf8c9xZQnei5Di2L7Md7X7nsRTOsU7+lrpKRfPLMb+UhC3JaOGYDd2NWKJp5F9S08if5agTeD+hbTGIXd2B355F6E7S1r2tDtFLH3PRjyMTCNZqTWbcEGH0r04rYvQeqyqYPMF3sLTSMwMVu6rV4uHutReizeHEToGScfUivZKDbkPO4e8+xJftX7P/Bb5NPij+vTHiswUoaOxoVTvts2U+EwkaXVHrWROUvv2MkYdNUI46Z/4eqSUgv8RStSHTPuijbdSo57Ejy3lSd/zijcTI+lx8unbm99QSs1/aptuPFBaggTkJ9hSgjAp2jVPZfc3FW9cURFz5zeC/hB8JuevpPLFOLNkVK6E4wrJeD2x2V7pMl5q/jiThEY56Ay8NmSySaOf9jl/Wsy4h8adWK6mTMYPtKr01jLRJmlm9MjGEWo6IXUpmZihMUecFvr0CPwLEm2C+/6hvdEAAAAASUVORK5CYII=';
const menuIconURI = blockIconURI; 

class Scratch3AutopilotTrainBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }


    /**
     * The key to load & store a target's pen-related state.
     * @type {string}
     */
    static get STATE_KEY () {
        return 'Scratch.autopilottrain';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'autopilottrain',
            name: formatMessage({
                id: 'autopilottrain.categoryName',
                default: '训练模式',
                description: 'Label for the auto pilot train extension category'
            }),
            // menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            // showStatusButton: true,
            blocks: [
                // {
                //     opcode: 'say',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({
                //         id: 'autopilottrain.say',
                //         default: 'say [TEXT]',
                //         description: 'say something'
                //     }),
                //     arguments: {
                //         TEXT: {
                //             type: ArgumentType.STRING,
                //             defaultValue: formatMessage({
                //                 id: 'autopilottrain.defaultTextToSay',
                //                 default: 'this is an autopilottrain extension',
                //                 description: 'default text to say.'
                //             })
                //         }
                //     }
                // }
                {
                    opcode: 'setInputOutput',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'autopilottrain.setInputOutput',
                        default: '设置神经网络的输入输出',
                        description: 'set the input and output of the NN'
                    }),
                },
                {
                    opcode: 'setdataPath',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'autopilottrain.setdataPath',
                        default: "神经网络从[DATAPATH]获取数据",
                        description: 'set the data path from the computer disk'
                    }),
                    arguments: {
                        DATAPATH: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'autopilottrain.defaultTextOfDataPath',
                                default: "C:\\Users\\zx\\picture_tub",
                                descriptin: 'default value of data path'
                            })
                        }
                    }
                },
                {
                    opcode: 'dataPreprocessing',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'autopilottrain.dataPreprocessing',
                        default: '数据预处理',
                        description: 'data preprocess'
                    }),
                },
                {
                    opcode: 'setModelSavePath',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'autopilottrain.setModelSavePath',
                        default: "模型保存到[MODELPATH]",
                        description: 'set the model save path from the computer disk'
                    }),
                    arguments: {
                        MODELPATH: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'autopilottrain.defaultTextOfModelSavePath',
                                default: "C:\\Users\\zx\\modelx",
                                descriptin: 'default value of model save path'
                            })
                        }
                    }
                },
                {
                    opcode: 'startNeuralNetwork',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'autopilottrain.startNeuralNetwork',
                        default: '启动神经网络',
                        description: 'start Neural Network'
                    }),
                },
                {
                    opcode: 'startToTrain',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'autopilottrain.startToTrain',
                        default: '开始训练',
                        description: 'start to train the model'
                    }),
                },
            ],
            menus: {}
        };
    }

    // say (args, util) {
    //     const message = args.TEXT;
    //     console.log(message);
    //     this.runtime.emit('SAY', util.target, 'say', message);
    // }
    setInputOutput(args, util) {
        
    }
    setdataPath(args, util) {
        const datapath = args.DATAPATH;
        console.log(datapath);
    }
    dataPreprocessing(args, util) {
        
    }
    setModelSavePath(args, util) {
        const modelpath = args.MODELPATH;
        console.log(modelpath);
    }
    startNeuralNetwork(args, util) {
        
    }
    startToTrain(args, util) {
        
    }
}

module.exports = Scratch3AutopilotTrainBlocks;