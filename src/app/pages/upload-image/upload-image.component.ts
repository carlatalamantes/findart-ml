import { Component } from '@angular/core';
import SwiperCore, { Virtual, Scrollbar } from 'swiper';
import paintingsResults from 'src/app/utils/paintingsResults';
import { ApiService } from 'src/app/services/api.service';

SwiperCore.use([Virtual, Scrollbar]);


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],

})
export class UploadImageComponent {
  selectedFile = null;
  preview!: string;
  relatedPaintings: any[] = [];
  relatedMovement: string = '';
  relatedMovementDescription: string = '';
  loading: boolean = false;
  success: boolean = true;

  breakpoints = {
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.preview = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onFileSubmit() {
    this.loading = true;
    var formData: any = new FormData();
    formData.append('file', this.selectedFile);
    this.apiService.decisionTree(formData).subscribe({
      next: (response) => {
        this.success=true;
        this.loading = false;
        let category = this.getPrediction(response.prediction);
        this.getRelatedPaintings(category);
      },
      error: (error) => {
        this.success=false;
        this.loading = false;
        console.log(error)
      },
    });


  }

  getRelatedPaintings(artisticMovementResult: string) {
    this.relatedMovement = paintingsResults.filter(painting => painting.artisticMovement === artisticMovementResult).map(painting => painting.artisticMovement)[0];
    this.relatedMovementDescription = paintingsResults.filter(painting => painting.artisticMovement === artisticMovementResult).map(painting => painting.description)[0];
    this.relatedPaintings = paintingsResults.filter(painting => painting.artisticMovement === artisticMovementResult).map(painting => painting.data);
  }

  getPrediction(result: string): string {
    switch (result) {
      case "[0]":
        return 'Contemporary art'
      case "[1]":
        return 'Medieval art'
      case "[2]":
        return 'Modern art'
      default:
        return ''
    }

  }

}
