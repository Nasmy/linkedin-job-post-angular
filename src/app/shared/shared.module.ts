import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NetworkComponent } from "./modal/network/network.component";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [NetworkComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FeahterIconModule,
    SweetAlert2Module.forRoot(),
  ],
  exports: [NetworkComponent],
})
export class SharedModule {}
