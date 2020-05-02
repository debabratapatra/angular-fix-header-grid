
import { Configs } from '../models/Configs.model';
import { AngularFixHeaderGridService } from '../angular-fix-header-grid.service';

export class Store {
    processed_data: any[];
    raw_data: any[];
    display_data: any[];
    configs: Configs;

    getRawData() {
        return this.raw_data;
    }

    setRawData(raw_data) {
        this.raw_data = raw_data;
    }

    getProcessedData() {
        return this.processed_data;
    }

    setProcessedData(processed_data) {
        this.processed_data = processed_data;
        this.setDisplayData([...processed_data]);
    }

    getDisplayData() {
        return this.display_data;
    }

    setDisplayData(display_data) {
        this.display_data = display_data;
        // this.angularTreeGridService.updateDisplayDataObservable(this.display_data);
    }

    constructor(private angularFixHeaderGridService: AngularFixHeaderGridService) { }

    processData(data, configs: Configs, edit_tracker, internal_configs) {
        this.raw_data = data;
        this.processed_data = data;
        this.processed_data = data;
        this.setRawData(data);
        this.configs = configs;
    }

}
