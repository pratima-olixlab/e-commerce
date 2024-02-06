import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { IconsProviderModule } from './icons-provider.module';

@NgModule({
  declarations: [],

  exports: [
    NzPaginationModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
  ],
})
export class NgZorroModule {}
