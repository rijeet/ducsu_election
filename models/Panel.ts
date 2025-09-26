import mongoose, { Schema, models, model } from "mongoose";

export interface IPanel {
  _id?: string;
  name: string;
  description?: string;
}

const PanelSchema = new Schema<IPanel>({
  name: { type: String, required: true, index: true },
  description: { type: String },
}, { timestamps: true });

export default models.Panel || model<IPanel>("Panel", PanelSchema);
