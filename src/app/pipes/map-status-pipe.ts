import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "mapStatus",
})
export class MapStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "new":
        return "Nuova";
      case "draft":
        return "Bozza";
      case "completed":
        return "Completata";
      default:
        return "Sconosciuto";
    }
  }
}
