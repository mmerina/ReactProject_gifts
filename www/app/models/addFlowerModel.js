import _ from "lodash/fp";

export default {
    "namespace": "addFlower",
    "state": {
        step: 0,
        isModal:false,		
        form0: {},
        form1: {}
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