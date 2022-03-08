#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["NuGet.Config", "."]
COPY ["src/MyProject.IdentityServer/MyProject.IdentityServer.csproj", "src/MyProject.IdentityServer/"]
COPY ["src/MyProject.EntityFrameworkCore/MyProject.EntityFrameworkCore.csproj", "src/MyProject.EntityFrameworkCore/"]
COPY ["src/MyProject.Domain/MyProject.Domain.csproj", "src/MyProject.Domain/"]
COPY ["src/MyProject.Domain.Shared/MyProject.Domain.Shared.csproj", "src/MyProject.Domain.Shared/"]
RUN dotnet restore "src/MyProject.IdentityServer/MyProject.IdentityServer.csproj"
COPY . .
WORKDIR "/src/src/MyProject.IdentityServer"
RUN dotnet build "MyProject.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyProject.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyProject.IdentityServer.dll"]