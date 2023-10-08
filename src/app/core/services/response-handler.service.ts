import { Injectable } from "@angular/core";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Injectable({
  providedIn: "root",
})
export class ResponseHandlerService {
  constructor() {}

  apiResponse(response) {
    if (response.success === true) {
      return true;
    } else {
      return false;
    }
  }

  notifyMessage(responseObj) {
    console.log(responseObj);
    const message = responseObj.message;
    switch (responseObj.success) {
      case true:
        return Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1113000,
          title: message,
          icon: "success",
        });
      case false:
        return Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 11000,
          title: message,
          icon: "error",
        });
    }
  }
}
