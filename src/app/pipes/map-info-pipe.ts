import { Pipe, PipeTransform } from "@angular/core";
import { MapData } from "../models/MapData";

@Pipe({
  name: "mapInfo",
})
export class MapInfoPipe implements PipeTransform {
  transform(value: MapData): string {
    return `${value.id}/${value.status}/${value.public ? 'Public' : 'Private'}`;
  }
}
