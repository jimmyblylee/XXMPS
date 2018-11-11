@echo off
set BASEDIR=%~sdp0
call %BASEDIR%\setEnv.bat

echo removing the old
rmdir /S /Q %TOMCAT_HOME%\webapps\xxmps >NUL 2>NUL
del /F /Q %TOMCAT_HOME%\webapps\xxmps.war >NUL
echo deploying the new
copy /Y %PROJECT_HOME%\xxmps-build\xxmps-war\target\xxmps.war %TOMCAT_HOME%\webapps\xxmps.war
echo done
timeout /t 1 >NUL