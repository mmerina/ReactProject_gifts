import _ from "lodash/fp";

export default {
    "namespace": "addFlower",
    "state": {
        step: 0,		
        form0: {

        },
        form1: {

        },
        form2: [

        ]
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
        addForm2(state, { fileinfo }) {
            return _.set("form2", [
                ...state.form2,
                fileinfo
            ], state);
        }
    }
}