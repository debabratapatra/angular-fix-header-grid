
import { Configs } from '../models/Configs.model';
import { AngularFixHeaderGridService } from '../angular-fix-header-grid.service';

export class Store {
    processed_data: any[] = [];
    raw_data: any[];
    display_data: any[] = [];
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
        this.angularFixHeaderGridService.updateDisplayDataObservable(this.display_data);
    }

    constructor(private angularFixHeaderGridService: AngularFixHeaderGridService) { }

    processData(data, configs: Configs, edit_tracker, internal_configs) {
        this.raw_data = data;
        let data_index = 0;
        this.raw_data.forEach(row => {
            this.processed_data[data_index] = row;
            ++data_index;
        });
        let index = 0;
        this.processed_data.forEach(row => {
            row.idx = index;
            this.display_data[index] = row;
            edit_tracker[index] = false;
            ++index;
        });
        this.configs = configs;
    }

    addRecord(row_data) {
        let last_index = this.processed_data[this.processed_data.length - 1].idx;
        row_data.idx = ++last_index;
        this.processed_data.push(row_data);
        this.setDisplayData(this.processed_data);
    }

    filterBy(columns, search_values) {
        this.display_data = this.processed_data.filter((record) => {
            let found = true;
            for (let index = 0; index < columns.length; index++) {
                const column = columns[index];
                let column_value = record[column.name];
                let search_value = search_values[index];

                // If blank then continue.
                if (!search_value) {
                    continue;
                }

                // Call custom filter function.
                if (column.filter_function) {
                    const response = column.filter_function(record, column, column_value, search_value);
                    if (response === false) {
                        found = false;
                    }
                } else {
                    if (typeof (column_value) === 'number') {
                        if (column_value !== parseInt(search_value, 10)) {
                            found = false;
                        }
                    } else {
                        if (!column.case_sensitive_filter) {
                            column_value = column_value.toLowerCase();
                            search_value = search_value.toLowerCase();
                        }
                        if (column_value.indexOf(search_value) === -1) {
                            found = false;
                        }
                    }
                }
            }
            return found;
        });
        this.angularFixHeaderGridService.updateDisplayDataObservable(this.display_data);
    }

    refreshDisplayData() {
        this.display_data = this.processed_data;
        this.angularFixHeaderGridService.updateDisplayDataObservable(this.display_data);
    }

}
