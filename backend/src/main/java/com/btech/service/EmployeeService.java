package com.btech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btech.model.Employee;
import com.btech.repositories.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
    private EmployeeRepository employeeRepository;

	public Employee getEmployees(Long id) {
		return employeeRepository.findOne(id);
	}

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    
}
