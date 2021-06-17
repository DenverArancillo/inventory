@echo off

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params= %*
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params:"=""%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------    

@echo off
echo. >> C:\xampp\apache\conf\extra\httpd-vhosts.conf
echo ^<VirtualHost *:80^> >> C:\xampp\apache\conf\extra\httpd-vhosts.conf
echo    ServerAdmin webmaster@localhost.com >> C:\xampp\apache\conf\extra\httpd-vhosts.conf
echo    DocumentRoot "C:/xampp/htdocs/inventory/public" >> C:\xampp\apache\conf\extra\httpd-vhosts.conf
echo    ServerName inventory.test >> C:\xampp\apache\conf\extra\httpd-vhosts.conf
echo ^</VirtualHost^> >> C:\xampp\apache\conf\extra\httpd-vhosts.conf

echo. >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 inventory.test >> C:\Windows\System32\drivers\etc\hosts