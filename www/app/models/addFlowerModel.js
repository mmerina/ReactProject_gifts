import _ from "lodash/fp";

export default {
    "namespace": "addFlower",
    "state": {
        step: 0,
        isModal:false,		
        form0: {
            // color:{ value: "粉色", name: "color", touched: true, dirty: false, errors: undefined },
            // mainflower:{ value: "康乃馨", name: "mainflower", touched: true, dirty: false, errors: undefined},
            // name: { value: "嫣然", name: "name", touched: true, dirty: false, errors: undefined},
            // others: { value: "粉色康乃馨19枝，粉色扶郎花5枝，紫色小雏菊3枝，银叶菊10枝", name: "others", touched: true, dirty: false, errors: undefined},
            // package: { value: "白色雾面纸，香芋紫／浅紫人造纸，粉色缎带花结", name: "package", touched: true, dirty: false, errors: undefined},
            // price:{ value: "208", name: "price", touched: true, dirty: false, errors: undefined},
            // amount: { value: "19", name: "amount", touched: true, dirty: false, errors: undefined},
            // purpose: { value: ["温暖亲情", "友谊万岁"], name: "purpose", touched: true, dirty: false, errors: undefined},
            // sendObject: { value: ["朋友", "家人", "领导", "病人"], name: "sendObject", touched: true, dirty: false, errors: undefined},
            // type:{ value: "鲜花", name: "type", touched: true, dirty: false, errors: undefined},
            // words: { value: "嫣然一笑，花染，云淡风轻。", name: "words", touched: true, dirty: false, errors: undefined }
        },
        form1: {
            // introductions: ["upload_8f3ebc6158a19d161bd9f2a5e467f402.jpg", "upload_77ed3d649d9838c382349c2ae5bc7c99.jpg", "upload_4122a46354432e4cf5885cecf88b15ca.jpg", "upload_807aed3c0bcc4a46dfefd73058fb6182.jpg", "upload_94a47f3fd471dad6c10a49682e92387d.jpg"],
            // views: ["upload_9d23f5492a76998250cf45a63c709dcc.jpg", "upload_cef84a711bfe56dde5b009e472621ead.jpg", "upload_7347694a413ffb7bef2e1933a7ebba84.jpg", "upload_b8a0a1395515dad1919336cbd688349a.jpg"]
        }
    },
    "reducers": {
        changeStep(state, { step }) {
            return _.set("step", step, state);
        },
        changeForm0(state, { form0 }) {
            return _.set("form0", form0, state);
        },
        changeForm1(state, { form1 }) {
            return _.set("form1", form1, state);
        },
        changeIsModal(state, { isModal }) {
            return _.set("isModal", isModal, state);
        }
    }
}