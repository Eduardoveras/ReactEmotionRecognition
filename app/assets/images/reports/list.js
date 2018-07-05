const emociones = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAABYEAIAAAAD2YsUAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAAdTAAAHUwAd0zcs0AAAZ8aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA2LTEzVDAxOjI5OjAxLTA0OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA2LTEzVDAxOjI5OjAxLTA0OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNi0xM1QwMToyOTowMS0wNDowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZmU0ODA5Zi0yYTZjLWQ0NGMtYTBmYi03MmRkY2NlMjE0YmMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjNjAxZDU2YS04NDMzLTM0NDktYWIwOS03YWEyNTE4MzIxODgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWJhZDQ4NS1kZjM5LThhNGYtOWFjYi03MjA5Yzk1YjQyMTIiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NWJhZDQ4NS1kZjM5LThhNGYtOWFjYi03MjA5Yzk1YjQyMTIiIHN0RXZ0OndoZW49IjIwMTgtMDYtMTNUMDE6Mjk6MDEtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNmZTQ4MDlmLTJhNmMtZDQ0Yy1hMGZiLTcyZGRjY2UyMTRiYyIgc3RFdnQ6d2hlbj0iMjAxOC0wNi0xM1QwMToyOTowMS0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBo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';
export default emociones;