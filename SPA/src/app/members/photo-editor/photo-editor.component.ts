import { Component, Input, OnInit } from '@angular/core';
import { IMember } from 'src/app/_models/imember';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: IMember | undefined;

  ngOnInit(): void {}
}
