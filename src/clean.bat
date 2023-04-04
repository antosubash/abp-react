@ECHO off
cls

ECHO Deleting all node_modules,.dist,.turbo folders...
ECHO.

FOR /d /r . %%d in (node_modules,dist,.turbo,out,.next) DO (
	IF EXIST "%%d" (
		ECHO.Deleting: %%d
			rd /s/q "%%d"
	)
)

ECHO node_modules,.dist,.turbo folders have been successfully deleted. Press any key to exit.
pause > nul
