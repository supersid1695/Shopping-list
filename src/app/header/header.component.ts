import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageservice } from '../shared/data-storage.service';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {
    @Output() selectedFeature = new EventEmitter<string>();
    onSelect(feature: string) {
        this.selectedFeature.emit(feature);
    }
    constructor(private dataService: DataStorageservice, private auth: AuthService) { }
    onSaveData() {
        this.dataService.storeRecipe().subscribe(
            (response: HttpResponse<any>) => console.log(response)
        );
    }

    onFetchData() {
        this.dataService.getRecipe();
    }

    onLogout() {
        this.auth.logOut();
    }
}
