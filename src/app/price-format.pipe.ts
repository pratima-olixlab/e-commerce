// price-format.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  transform(price: number | string | undefined | null, currencySymbol: string = '₹', decimalPlaces: number = 2): string {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (numericPrice == null || isNaN(numericPrice)) {
      return 'N/A';
    }
    const formattedPrice = currencySymbol + numericPrice.toFixed(decimalPlaces);
    return formattedPrice;
  }
}
