$filePath = "frontend\build.log"
$lastLine = ""
$rebuilt_flag = $env:rebuilt_flag
$printed_flag = $false

function Show-WindowsNotification {
    param(
        [string]$title,
        [string]$message,
        [int]$durationSeconds = 5,
        [string]$imagePath = "",
        [ValidateSet("ToastText01", "ToastImageAndText01")]
        [string]$toastTemplate = "ToastText01"
    )

    $ErrorActionPreference = "Stop"
    Add-Type -TypeDefinition @"
        using System;
        using Windows.Data.Xml.Dom;
        using Windows.UI.Notifications;

        public static class ToastNotificationHelper {
            public static void ShowToastNotification(string title, string message, int durationSeconds, string imagePath, string toastTemplate) {
                var templateType = (ToastTemplateType)Enum.Parse(typeof(ToastTemplateType), toastTemplate);
                var template = ToastNotificationManager.GetTemplateContent(templateType);

                var textElements = template.GetElementsByTagName("text");
                var textNode = template.CreateTextNode(message);
                textElements.AppendChild(textNode);

                if (!string.IsNullOrEmpty(imagePath)) {
                    var imageElements = template.GetElementsByTagName("image");
                    var imageNode = template.CreateElement("image");
                    imageNode.SetAttribute("src", imagePath);
                    imageElements.AppendChild(imageNode);
                }

                var xml = new XmlDocument();
                xml.LoadXml(template.GetXml());

                var toast = new ToastNotification(xml);
                toast.Tag = "idk";
                toast.Group = "idk";
                toast.ExpirationTime = DateTimeOffset.Now.AddSeconds(durationSeconds);

                var notifier = ToastNotificationManager.CreateToastNotifier(title);
                notifier.Show(toast);
            }
        }
"@

    [ToastNotificationHelper]::ShowToastNotification($title, $message, $durationSeconds, $imagePath, $toastTemplate)
}

if ($rebuilt_flag) {
    while ($true) {
        $latestLine = Get-Content -Path $filePath | Select-Object -Last 1
        if ($latestLine -ne $lastLine -and $latestLine -like '*built in*') {
            if ($printed_flag) {
                $timeTaken = [regex]::Match($latestLine, 'built in (\d+)ms').Groups[1].Value
                Write-Host "Frontend Rebuilt, Time taken: $timeTaken milliseconds" -ForegroundColor Yellow
                Show-WindowsNotification -title "Frontend Rebuilt" -message "Time taken: $timeTaken milliseconds" -duration 3
            }
            else {
                $printed_flag = $true 
            }
            $lastLine = $latestLine
            Start-Sleep -Seconds 1
        }
        else {
            $lastLine = $latestLine
            Start-Sleep -Seconds 1
        }
    }
}