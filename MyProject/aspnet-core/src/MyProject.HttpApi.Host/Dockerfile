#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["NuGet.Config", "."]
COPY ["src/MyProject.HttpApi.Host/MyProject.HttpApi.Host.csproj", "src/MyProject.HttpApi.Host/"]
COPY ["src/MyProject.HttpApi/MyProject.HttpApi.csproj", "src/MyProject.HttpApi/"]
COPY ["src/MyProject.Application.Contracts/MyProject.Application.Contracts.csproj", "src/MyProject.Application.Contracts/"]
COPY ["src/MyProject.Domain.Shared/MyProject.Domain.Shared.csproj", "src/MyProject.Domain.Shared/"]
COPY ["src/MyProject.Application/MyProject.Application.csproj", "src/MyProject.Application/"]
COPY ["src/MyProject.Domain/MyProject.Domain.csproj", "src/MyProject.Domain/"]
COPY ["src/MyProject.EntityFrameworkCore/MyProject.EntityFrameworkCore.csproj", "src/MyProject.EntityFrameworkCore/"]
RUN dotnet restore "src/MyProject.HttpApi.Host/MyProject.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/src/MyProject.HttpApi.Host"
RUN dotnet build "MyProject.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyProject.HttpApi.Host.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyProject.HttpApi.Host.dll"]