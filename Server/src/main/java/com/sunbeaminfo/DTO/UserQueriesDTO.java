package com.sunbeaminfo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserQueriesDTO {
private Long id;
    private String description;
    private String subject;
    private Long order_id;
    private Long user_id;

}
