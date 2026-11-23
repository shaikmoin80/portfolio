@echo off
rem Double-click this file to preview the site on your PC. Close the window to stop it.
cd /d "%~dp0"
set PORT=8000

rem Local-only helpers (both are ignored by Git, so they are never uploaded)
if not exist js\private.local.js copy js\private.local.example.js js\private.local.js >nul
if not exist cv\Shaik_Moin_CV_Cloud_Operations_SRE.pdf if exist ..\Role_Tailored_CVs\Shaik_Moin_CV_Cloud_Operations_SRE.pdf copy ..\Role_Tailored_CVs\Shaik_Moin_CV_Cloud_Operations_SRE.pdf cv\ >nul

echo.
echo  Portfolio running at  http://localhost:%PORT%/
echo  Keep this window open. Close it to stop the preview.
echo.
if not defined NOOPEN start "" cmd /c "timeout /t 2 >nul & start http://localhost:%PORT%/"

where python >nul 2>nul && (python -m http.server %PORT% & goto :end)
where py >nul 2>nul && (py -m http.server %PORT% & goto :end)
where node >nul 2>nul && (npx --yes http-server -p %PORT% & goto :end)
echo  Could not find Python or Node. Install Python from https://www.python.org/downloads/ and tick "Add python.exe to PATH".
:end
pause
