import { TestBed } from '@angular/core/testing';
import {CsvFileImportService} from './csv-file-import.service';
import {provideHttpClient} from '@angular/common/http';

describe('CsvFileImport', () => {
  let service: CsvFileImportService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();
    service = TestBed.inject(CsvFileImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should correctly import an exported csv file', async () => {
    const name = "";
    const vin = "";
    const kilometers = "";
    const manufacturer = "Omniscope";
    const id = "E4620C205B414D21 device1-testname-2025-06-02T14-19.csv";
    const sampleRate = 100000;
    const fileContents = `${name},${vin},${kilometers},${manufacturer},${id},${sampleRate}\n` + "47\n".repeat(49535);
    const fileSamples = fileContents.split("\n").length - 1; //-1 for initial header, containing the metadata

    const file = new File([fileContents], "device1-testname-2025-06-02T14-19.csv");
    service.files.set([file]);

    //wait on parse and signal propagation
    await new Promise(r => setTimeout(r, 200));

    const data = service.data();

    expect(data[id]).toBeDefined();
    const containedData = data[id];

    expect(containedData).toHaveSize(Math.ceil(fileSamples/sampleRate*1000));
    for (const [id, value] of containedData.entries()) {
      expect(value.timestamp).toBe(id);
      expect(value.value).toBe(47);
    }
  });
});
