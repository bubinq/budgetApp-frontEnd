import { useLabelData } from "../hooks/useLabelData"
import { Label } from "./Label";

export const LabelsList = () => {
    const labelData = useLabelData()
    return (
        <div className="graphLabelWrapper">
            {labelData.map((label, idx) => <Label key={idx} data={label}></Label>)}
        </div>
    )
}