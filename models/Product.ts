import mongoose, { Schema, Document } from 'mongoose';

export interface IVariant {
  name: string;
  asin: string;
  url: string;
  isDefault: boolean;
}

export interface IProduct extends Document {
  name: string;
  category: string;
  mainAsin: string;
  mainImage: string;
  variants: IVariant[];
}

const VariantSchema: Schema = new Schema({
  name: { type: String, required: true },
  asin: { type: String, required: true },
  url: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, default: 'Uncategorized' },
  mainAsin: { type: String, required: true, unique: true },
  mainImage: { type: String, required: true },
  variants: [VariantSchema]
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
