import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LinkedinService } from "src/app/core/services/linkedIn.services";
import Swal from "sweetalert2";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  networkType:any;
  postData: any;
  listTitle: any;
  constructor(private router: ActivatedRoute,  private linkedIn: LinkedinService) {}

  async ngOnInit(): Promise<void> {
    let data = null;
    this.router.queryParams.subscribe((params) => {
      this.networkType = params.networkType;
    });
    
    data = await this.linkedIn.postList(this.networkType).toPromise();
    this.postData = data['data'];
  }

 
}
