// Mappings/MappingProfile.cs
using AutoMapper;
using TaskFlow.API.Models.DTOs;
using TaskFlow.API.Models.Entities;

namespace TaskFlow.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User mappings
        CreateMap<ApplicationUser, UserDto>();

        // Project mappings
        CreateMap<Project, ProjectDto>()
            .ForMember(dest => dest.Members, opt => opt.MapFrom(src => src.Members))
            .ForMember(dest => dest.Columns, opt => opt.MapFrom(src => src.Columns));
        
        CreateMap<CreateProjectDto, Project>();
        
        CreateMap<ProjectMember, ProjectMemberDto>()
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));

        // Column mappings
        CreateMap<Column, ColumnDto>()
            .ForMember(dest => dest.Tasks, opt => opt.MapFrom(src => src.Tasks.OrderBy(t => t.Position)));
        
        CreateMap<CreateColumnDto, Column>();

        // Task mappings
        CreateMap<Models.Entities.Task, TaskDto>()
            .ForMember(dest => dest.Priority, opt => opt.MapFrom(src => src.Priority.ToString()))
            .ForMember(dest => dest.Labels, opt => opt.MapFrom(src => src.TaskLabels.Select(tl => tl.Label)));
        
        CreateMap<CreateTaskDto, Models.Entities.Task>();

        // TaskComment mappings
        CreateMap<TaskComment, TaskCommentDto>();
        CreateMap<CreateCommentDto, TaskComment>();

        // TaskAttachment mappings
        CreateMap<TaskAttachment, TaskAttachmentDto>();

        // Label mappings
        CreateMap<Label, LabelDto>();
        CreateMap<CreateLabelDto, Label>();
    }
}
