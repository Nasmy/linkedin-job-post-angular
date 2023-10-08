import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from "@angular/forms";

import { AsyncSubject, Subject } from "rxjs";
import { LinkedinService } from "src/app/core/services/linkedIn.services";
import { ActivatedRoute, Router } from "@angular/router";
import { isNull } from "@angular/compiler/src/output/output_ast";
import { FormValidationError } from "src/app/core/models/form-validator";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  @ViewChild("postPhoto") postPhoto: ElementRef;

  media = [];
  files = [];
  networks = [];
  fromProviderId: any;
  content: any;
  comment: any;

  likePostAuthor: Number = 0;
  firstComment: Number = 0;

  icontColor = "";
  postToSelectedItem: any;
  submitted = false;

  formValdationError = FormValidationError;

  postForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private linkedIn: LinkedinService,
    private route: Router,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}
  private editorSubject: Subject<any> = new AsyncSubject();
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.fromProviderId = params.profile_id;
    });
    this.linkedIn.listByType().subscribe(
      (data) => {
        this.networks = data["data"]["networks"];
      },
      (error) => {}
    );
    // array of objects
    this.postForm = this.formBuilder.group({
      fromNetworkId: [this.fromProviderId, [Validators.required]],
      person_id: ["", [Validators.required]],
      message: ["", [Validators.required]],
      media: [""],
      mediaSource: [""],
      likeAuther: [0],
      firstComment: [0],
      postComment: [""],
      schedulePost: [""],
      postType: ["ARTICLE", [Validators.required]], // 1) post live 2) Draft 3) Shedule
    });
  }

  get pf() {
    return this.postForm.controls;
  }

  onPost(status) {
    this.submitted = true;
    if (this.media.length > 0) {
      this.postForm.patchValue({
        postType: "IMAGE",
      });
    } else {
      this.postForm.patchValue({
        postType: "ARTICLE",
      });
    }
    if (this.postForm.invalid) {
      return;
    }

    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append("images[]", this.files[i]);
    }
    formData.append("post_from_id", this.postForm.get("fromNetworkId").value);
    formData.append("message", this.postForm.get("message").value);
    formData.append("person_id", this.postForm.get("person_id").value);
    formData.append("like_author", this.postForm.get("likeAuther").value);
    formData.append("comments", this.postForm.get("postComment").value);
    formData.append("first_comment", this.postForm.get("firstComment").value);
    formData.append("post_type", this.postForm.get("postType").value);
    formData.append("status", status);
    formData.append("", this.postForm.get("schedulePost").value);
    this.spinner.show();
    this.linkedIn.post(formData).subscribe(
      (data) => {
        this.spinner.hide();
        return Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1113000,
          title: "success",
          icon: "success",
        });
      },
      (error) => {
        this.spinner.hide();
        return Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 11000,
          title: "Failed to post",
          icon: "error",
        });
      }
    );
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.files.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.media.push(event.target.result);
          this.postForm.patchValue({
            mediaSource: this.media,
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
    this.postPhoto.nativeElement.value = null;
  }

  getSlectedPostTo(event) {
    this.postToSelectedItem = event;
    if (event != null) {
      this.postForm.patchValue({
        person_id: event.provider_id,
      });
    }
  }

  getShedulePicker(content) {
    this.modalService
      .open(content, { scrollable: true })
      .result.then((result) => {
        console.log("Modal closed" + result);
      })
      .catch((res) => {});
  }

  setContent(event) {
    let text = event.editor.getContent();
    this.content = text.replace(/(<([^>]+)>)/gi, "");
    this.postForm.patchValue({
      message: this.content,
    });
  }

  setComment(event) {
    let text = event.editor.getContent();
    this.comment = text.replace(/(<([^>]+)>)/gi, "");
    this.postForm.patchValue({
      postComment: this.comment,
    });
  }

  onCheckLikePost(event) {
    if (event.target.checked) {
      this.likePostAuthor = 1;
      this.icontColor = "blue";
    } else {
      this.likePostAuthor = 0;
      this.icontColor = "";
    }
    this.postForm.patchValue({
      likeAuther: this.likePostAuthor,
    });
  }

  onCheckFirstComment(event) {
    if (event.target.checked) {
      this.firstComment = 1;
    } else {
      this.firstComment = 0;
    }

    this.postForm.patchValue({
      firstComment: this.firstComment,
    });
  }

  onDelete($url) {
    this.media.splice($url, 1);
    this.files.splice($url, 1);
  }
}
