import { http } from '@/services/ApiService';

/* eslint-disable camelcase */

export type PhoneAttributes = {
  handset_cat_promotion_sticker: string | null;
  promotion_label: string | null;
  promotion_slider_source: string | null;
  promotion_bg_color: string | null;
  handset_cat_promotion_sticker_kz: string | null;
  promotion_label_kz: string | null;
  promotion_slider_source_kz: string | null;
  promotion_bg_color_kz: string | null;
}

interface VariantAttributes extends PhoneAttributes{
  color: string;
  color_code: string;
  color_name: string;
  memory: string;
}

export type PhoneVariant = {
  id: number;
  name: string;
  slug: string;
  next_ship_date: string | null;
  attributes: VariantAttributes;
  ui_suggested_sort_order: number;
}

export type Phone = {
  id: number;
  name: string;
  slug: string;
  manufacturer: string;
  model: string;
  operating_system: string;
  sim_card_capacity: string;
  refurbished: boolean;
  has_usp: boolean;
  has_5g: boolean;
  has_esim: boolean;
  colors: string[];
  sort_order: number;
  release_date: string;
  variants: PhoneVariant[];
  attributes: PhoneAttributes;
  has_promotion: boolean;
};

export const getPhones = async (): Promise<Phone[]> => {
  const { data } = await http.get<Phone[]>('/products');
  return data;
};
