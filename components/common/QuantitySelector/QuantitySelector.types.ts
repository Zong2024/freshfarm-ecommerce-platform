export interface QuantitySelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  min?: number;
  disabled?: boolean;
}
